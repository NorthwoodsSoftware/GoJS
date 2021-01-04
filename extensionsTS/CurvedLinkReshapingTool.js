/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
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
    exports.CurvedLinkReshapingTool = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * This CurvedLinkReshapingTool class allows for a {@link Link}'s path to be modified by the user
     * via the dragging of a single tool handle at the middle of the link.
     * Dragging the handle changes the value of {@link Link#curviness}.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/CurvedLinkReshaping.html">Curved Link Reshaping</a> sample.
     * @category Tool Extension
     */
    var CurvedLinkReshapingTool = /** @class */ (function (_super) {
        __extends(CurvedLinkReshapingTool, _super);
        function CurvedLinkReshapingTool() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._originalCurviness = NaN;
            return _this;
        }
        /**
         * @hidden @internal
         */
        CurvedLinkReshapingTool.prototype.makeAdornment = function (pathshape) {
            var link = pathshape.part;
            if (link !== null && link.curve === go.Link.Bezier && link.pointsCount === 4) {
                var adornment = new go.Adornment();
                adornment.type = go.Panel.Link;
                var h = this.makeHandle(pathshape, 0);
                this.setReshapingBehavior(h, go.LinkReshapingTool.All);
                h.cursor = 'move';
                adornment.add(h);
                adornment.category = this.name;
                adornment.adornedObject = pathshape;
                return adornment;
            }
            else {
                return _super.prototype.makeAdornment.call(this, pathshape);
            }
        };
        /**
         * Start reshaping, if {@link #findToolHandleAt} finds a reshape handle at the mouse down point.
         *
         * If successful this sets {@link #handle} to be the reshape handle that it finds
         * and {@link #adornedLink} to be the {@link Link} being routed.
         * It also remembers the original link route (a list of Points) and curviness in case this tool is cancelled.
         * And it starts a transaction.
         */
        CurvedLinkReshapingTool.prototype.doActivate = function () {
            _super.prototype.doActivate.call(this);
            if (this.adornedLink !== null)
                this._originalCurviness = this.adornedLink.curviness;
        };
        /**
         * Restore the link route to be the original points and curviness and stop this tool.
         */
        CurvedLinkReshapingTool.prototype.doCancel = function () {
            if (this.adornedLink !== null)
                this.adornedLink.curviness = this._originalCurviness;
            _super.prototype.doCancel.call(this);
        };
        /**
         * Change the route of the {@link #adornedLink} by moving the point corresponding to the current
         * {@link #handle} to be at the given {@link Point}.
         * This is called by {@link #doMouseMove} and {@link #doMouseUp} with the result of calling
         * {@link #computeReshape} to constrain the input point.
         * @param {Point} newpt the value of the call to {@link #computeReshape}.
         */
        CurvedLinkReshapingTool.prototype.reshape = function (newpt) {
            var link = this.adornedLink;
            if (link !== null && link.curve === go.Link.Bezier && link.pointsCount === 4) {
                var start = link.getPoint(0);
                var end = link.getPoint(3);
                var ang = start.directionPoint(end);
                var mid = new go.Point((start.x + end.x) / 2, (start.y + end.y) / 2);
                var a = new go.Point(9999, 0).rotate(ang + 90).add(mid);
                var b = new go.Point(9999, 0).rotate(ang - 90).add(mid);
                var q = newpt.copy().projectOntoLineSegmentPoint(a, b);
                var curviness = Math.sqrt(mid.distanceSquaredPoint(q));
                var port = link.fromPort;
                if (port === link.toPort && port !== null) {
                    if (newpt.y < port.getDocumentPoint(go.Spot.Center).y)
                        curviness = -curviness;
                }
                else {
                    var diff = mid.directionPoint(q) - ang;
                    if ((diff > 0 && diff < 180) || (diff < -180))
                        curviness = -curviness;
                }
                link.curviness = curviness;
            }
            else {
                _super.prototype.reshape.call(this, newpt);
            }
        };
        return CurvedLinkReshapingTool;
    }(go.LinkReshapingTool));
    exports.CurvedLinkReshapingTool = CurvedLinkReshapingTool;
});
