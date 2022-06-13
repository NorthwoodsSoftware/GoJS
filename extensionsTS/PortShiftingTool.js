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
    exports.PortShiftingTool = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * The PortShiftingTool class lets a user move a port on a {@link Node}.
     *
     * This tool only works when the Node has a port (any GraphObject) marked with
     * a non-null and non-empty portId that is positioned in a Spot Panel,
     * and the user holds down the Shift key.
     * It works by modifying that port's {@link GraphObject#alignment} property.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsJSM/PortShifting.html">Port Shifting</a> sample.
     * @category Tool Extension
     */
    var PortShiftingTool = /** @class */ (function (_super) {
        __extends(PortShiftingTool, _super);
        /**
         * Constructs a PortShiftingTool and sets the name for the tool.
         */
        function PortShiftingTool() {
            var _this = _super.call(this) || this;
            /**
             * The port being shifted.
             */
            _this.port = null;
            _this._originalAlignment = go.Spot.Default;
            _this.name = 'PortShifting';
            return _this;
        }
        /**
         * This tool can only start if the mouse has moved enough so that it is not a click,
         * and if the mouse down point is on a GraphObject "port" in a Spot Panel,
         * as determined by {@link #findPort}.
         */
        PortShiftingTool.prototype.canStart = function () {
            var diagram = this.diagram;
            if (!_super.prototype.canStart.call(this))
                return false;
            // require left button & that it has moved far enough away from the mouse down point, so it isn't a click
            var e = diagram.lastInput;
            if (!e.left || !e.shift)
                return false;
            if (!this.isBeyondDragSize())
                return false;
            return this.findPort() !== null;
        };
        /**
         * From the {@link GraphObject} at the mouse point, search up the visual tree until we get to
         * an object that has the {@link GraphObject#portId} property set to a non-empty string, that is in a Spot Panel,
         * and that is not the main element of the panel (typically the first element).
         * @return {GraphObject} This returns null if no such port is at the mouse down point.
         */
        PortShiftingTool.prototype.findPort = function () {
            var diagram = this.diagram;
            var e = diagram.firstInput;
            var elt = diagram.findObjectAt(e.documentPoint, null, null);
            if (elt === null || !(elt.part instanceof go.Node))
                return null;
            while (elt !== null && elt.panel !== null) {
                if (elt.panel.type === go.Panel.Spot && elt.panel.findMainElement() !== elt &&
                    elt.portId !== null && elt.portId !== '')
                    return elt;
                elt = elt.panel;
            }
            return null;
        };
        /**
         * Start a transaction, call {@link #findPort} and remember it as the "port" property,
         * and remember the original value for the port's {@link GraphObject#alignment} property.
         */
        PortShiftingTool.prototype.doActivate = function () {
            this.startTransaction('Shifted Label');
            this.port = this.findPort();
            if (this.port !== null) {
                this._originalAlignment = this.port.alignment.copy();
            }
            _super.prototype.doActivate.call(this);
        };
        /**
         * Stop any ongoing transaction.
         */
        PortShiftingTool.prototype.doDeactivate = function () {
            _super.prototype.doDeactivate.call(this);
            this.stopTransaction();
        };
        /**
         * Clear any reference to a port element.
         */
        PortShiftingTool.prototype.doStop = function () {
            this.port = null;
            _super.prototype.doStop.call(this);
        };
        /**
         * Restore the port's original value for GraphObject.alignment.
         */
        PortShiftingTool.prototype.doCancel = function () {
            if (this.port !== null) {
                this.port.alignment = this._originalAlignment;
            }
            _super.prototype.doCancel.call(this);
        };
        /**
         * During the drag, call {@link #updateAlignment} in order to set the {@link GraphObject#alignment} of the port.
         */
        PortShiftingTool.prototype.doMouseMove = function () {
            if (!this.isActive)
                return;
            this.updateAlignment();
        };
        /**
         * At the end of the drag, update the alignment of the port and finish the tool,
         * completing a transaction.
         */
        PortShiftingTool.prototype.doMouseUp = function () {
            if (!this.isActive)
                return;
            this.updateAlignment();
            this.transactionResult = 'Shifted Label';
            this.stopTool();
        };
        /**
         * Save the port's {@link GraphObject#alignment} as a fractional Spot in the Spot Panel
         * that the port is in. Thus if the main element changes size, the relative positions
         * of the ports will be maintained. But that does assume that the port must remain
         * inside the main element -- it cannot wander away from the node.
         * This does not modify the port's {@link GraphObject#alignmentFocus} property.
         */
        PortShiftingTool.prototype.updateAlignment = function () {
            if (this.port === null || this.port.panel === null)
                return;
            var last = this.diagram.lastInput.documentPoint;
            var main = this.port.panel.findMainElement();
            if (main === null)
                return;
            var tl = main.getDocumentPoint(go.Spot.TopLeft);
            var br = main.getDocumentPoint(go.Spot.BottomRight);
            var x = Math.max(0, Math.min((last.x - tl.x) / (br.x - tl.x), 1));
            var y = Math.max(0, Math.min((last.y - tl.y) / (br.y - tl.y), 1));
            this.port.alignment = new go.Spot(x, y);
        };
        return PortShiftingTool;
    }(go.Tool));
    exports.PortShiftingTool = PortShiftingTool;
});
