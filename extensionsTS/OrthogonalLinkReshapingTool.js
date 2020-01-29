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
     * The OrthogonalLinkReshapingTool class lets a user drag a tool handle along the link segment, which will move the whole segment.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/OrthogonalLinkReshaping.html">Orthogonal Link Reshaping</a> sample.
     * @category Tool Extension
     */
    var OrthogonalLinkReshapingTool = /** @class */ (function (_super) {
        __extends(OrthogonalLinkReshapingTool, _super);
        /**
         * Constructs an OrthogonalLinkReshapingTool and sets the name for the tool.
         */
        function OrthogonalLinkReshapingTool() {
            var _this = _super.call(this) || this;
            _this._alreadyAddedPoint = false;
            _this.name = 'OrthogonalLinkReshaping';
            return _this;
        }
        /**
         * @hidden @internal
         * For orthogonal, straight links, create the handles and set reshaping behavior.
         */
        OrthogonalLinkReshapingTool.prototype.makeAdornment = function (pathshape) {
            var link = pathshape.part;
            // add all normal handles first
            var adornment = _super.prototype.makeAdornment.call(this, pathshape);
            // add long reshaping handles for orthogonal, straight links
            if (link !== null && link.isOrthogonal && link.curve !== go.Link.Bezier) {
                var firstindex = link.firstPickIndex + (link.resegmentable ? 0 : 1);
                var lastindex = link.lastPickIndex - (link.resegmentable ? 0 : 1);
                for (var i = firstindex; i < lastindex; i++) {
                    this.makeSegmentDragHandle(link, adornment, i);
                }
            }
            return adornment;
        };
        /**
         * This stops the current reshaping operation and updates any link handles.
         */
        OrthogonalLinkReshapingTool.prototype.doDeactivate = function () {
            this._alreadyAddedPoint = false;
            // when we finish, recreate adornment to ensure proper reshaping behavior/cursor
            var link = this.adornedLink;
            if (link !== null && link.isOrthogonal && link.curve !== go.Link.Bezier) {
                var pathshape = link.path;
                if (pathshape !== null) {
                    var adornment = this.makeAdornment(pathshape);
                    if (adornment !== null) {
                        link.addAdornment(this.name, adornment);
                        adornment.location = link.position;
                    }
                }
            }
            _super.prototype.doDeactivate.call(this);
        };
        /**
         * Change the route of the {@link #adornedLink} by moving the segment corresponding to the current
         * {@link #handle} to be at the given {@link Point}.
         */
        OrthogonalLinkReshapingTool.prototype.reshape = function (newpt) {
            var link = this.adornedLink;
            // identify if the handle being dragged is a segment dragging handle
            if (link !== null && link.isOrthogonal && link.curve !== go.Link.Bezier && this.handle !== null && this.handle.toMaxLinks === 999) {
                link.startRoute();
                var index = this.handle.segmentIndex; // for these handles, firstPickIndex <= index < lastPickIndex
                if (!this._alreadyAddedPoint && link.resegmentable) { // only change the number of points if Link.resegmentable
                    this._alreadyAddedPoint = true;
                    if (index === link.firstPickIndex) {
                        link.insertPoint(index, link.getPoint(index).copy());
                        index++;
                        this.handle.segmentIndex = index;
                    }
                    else if (index === link.lastPickIndex - 1) {
                        link.insertPoint(index, link.getPoint(index).copy());
                    }
                }
                var behavior = this.getReshapingBehavior(this.handle);
                if (behavior === go.LinkReshapingTool.Vertical) {
                    // move segment vertically
                    link.setPointAt(index, link.getPoint(index - 1).x, newpt.y);
                    link.setPointAt(index + 1, link.getPoint(index + 2).x, newpt.y);
                }
                else if (behavior === go.LinkReshapingTool.Horizontal) {
                    // move segment horizontally
                    link.setPointAt(index, newpt.x, link.getPoint(index - 1).y);
                    link.setPointAt(index + 1, newpt.x, link.getPoint(index + 2).y);
                }
                link.commitRoute();
            }
            else {
                _super.prototype.reshape.call(this, newpt);
            }
        };
        /**
         * Create the segment dragging handles.
         * There are two parts: one invisible handle that spans the segment, and a visible handle at the middle of the segment.
         * These are inserted at the front of the adornment such that the normal handles have priority.
         */
        OrthogonalLinkReshapingTool.prototype.makeSegmentDragHandle = function (link, adornment, index) {
            var a = link.getPoint(index);
            var b = link.getPoint(index + 1);
            var seglength = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
            // determine segment orientation
            var orient = '';
            if (this.isApprox(a.x, b.x) && this.isApprox(a.y, b.y)) {
                b = link.getPoint(index - 1);
                if (this.isApprox(a.x, b.x)) {
                    orient = 'vertical';
                }
                else if (this.isApprox(a.y, b.y)) {
                    orient = 'horizontal';
                }
            }
            else {
                if (this.isApprox(a.x, b.x)) {
                    orient = 'vertical';
                }
                else if (this.isApprox(a.y, b.y)) {
                    orient = 'horizontal';
                }
            }
            // make an invisible handle along the whole segment
            var h = new go.Shape();
            h.strokeWidth = 6;
            h.opacity = 0;
            h.segmentOrientation = go.Link.OrientAlong;
            h.segmentIndex = index;
            h.segmentFraction = 0.5;
            h.toMaxLinks = 999; // set this unsused property to easily identify that we have a segment dragging handle
            if (orient === 'horizontal') {
                this.setReshapingBehavior(h, go.LinkReshapingTool.Vertical);
                h.cursor = 'n-resize';
            }
            else {
                this.setReshapingBehavior(h, go.LinkReshapingTool.Horizontal);
                h.cursor = 'w-resize';
            }
            h.geometryString = 'M 0 0 L ' + seglength + ' 0';
            adornment.insertAt(0, h);
        };
        /**
         * Compare two numbers to ensure they are almost equal.
         * Used in this class for comparing coordinates of Points.
         */
        OrthogonalLinkReshapingTool.prototype.isApprox = function (x, y) {
            var d = x - y;
            return d < 0.5 && d > -0.5;
        };
        return OrthogonalLinkReshapingTool;
    }(go.LinkReshapingTool));
    exports.OrthogonalLinkReshapingTool = OrthogonalLinkReshapingTool;
});
