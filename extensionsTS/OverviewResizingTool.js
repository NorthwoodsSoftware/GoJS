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
     * The OverviewResizingTool class lets the user resize the box within an overview.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/OverviewResizing.html">Overview Resizing</a> sample.
     * @category Tool Extension
     */
    var OverviewResizingTool = /** @class */ (function (_super) {
        __extends(OverviewResizingTool, _super);
        /**
         * Constructs an OverviewResizingTool and sets the name for the tool.
         */
        function OverviewResizingTool() {
            var _this = _super.call(this) || this;
            _this.name = 'OverviewResizing';
            _this._handleSize = new go.Size(6, 6);
            return _this;
        }
        /**
         * @hidden @internal
         * @param {Shape} resizeBox
         * @return {Adornment}
         */
        OverviewResizingTool.prototype.makeAdornment = function (resizeBox) {
            this._handleSize.setTo(resizeBox.strokeWidth * 3, resizeBox.strokeWidth * 3);
            // Set up the resize adornment
            var ad = new go.Adornment();
            ad.type = go.Panel.Spot;
            ad.locationSpot = go.Spot.Center;
            var ph = new go.Placeholder();
            ph.isPanelMain = true;
            ad.add(ph);
            var hnd = new go.Shape();
            hnd.name = 'RSZHND';
            hnd.figure = 'Rectangle';
            hnd.desiredSize = this._handleSize;
            hnd.cursor = 'se-resize';
            hnd.alignment = go.Spot.BottomRight;
            hnd.alignmentFocus = go.Spot.Center;
            ad.add(hnd);
            ad.adornedObject = resizeBox;
            return ad;
        };
        /**
         * @hidden @internal
         * Keep the resize handle properly sized as the scale is changing.
         * This overrides an undocumented method on the ResizingTool.
         * @param {Adornment} elt
         * @param {number} angle
         */
        OverviewResizingTool.prototype.updateResizeHandles = function (elt, angle) {
            if (elt === null)
                return;
            var handle = elt.findObject('RSZHND');
            var box = elt.adornedObject;
            this._handleSize.setTo(box.strokeWidth * 3, box.strokeWidth * 3);
            handle.desiredSize = this._handleSize;
        };
        /**
         * Overrides {@link ResizingTool#resize} to resize the overview box via setting the observed diagram's scale.
         * @param {Rect} newr the intended new rectangular bounds the overview box.
         */
        OverviewResizingTool.prototype.resize = function (newr) {
            var overview = this.diagram;
            var observed = overview.observed;
            if (observed === null)
                return;
            var oldr = observed.viewportBounds.copy();
            var oldscale = observed.scale;
            if (oldr.width !== newr.width || oldr.height !== newr.height) {
                if (newr.width > 0 && newr.height > 0) {
                    observed.scale = Math.min(oldscale * oldr.width / newr.width, oldscale * oldr.height / newr.height);
                }
            }
        };
        return OverviewResizingTool;
    }(go.ResizingTool));
    exports.OverviewResizingTool = OverviewResizingTool;
});
