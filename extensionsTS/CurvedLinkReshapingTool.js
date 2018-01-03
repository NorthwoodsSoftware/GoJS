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
    // A custom LinkReshapingTool that shows only a single reshape handle on a Bezier curved Link.
    // Dragging that handle changes the value of {@link Link#curviness}.
    /**
    * @constructor
    * @extends LinkReshapingTool
    * @class
    * This CurvedLinkReshapingTool class allows for a Link's path to be modified by the user
    * via the dragging of a single tool handle at the middle of the link.
    */
    var CurvedLinkReshapingTool = /** @class */ (function (_super) {
        __extends(CurvedLinkReshapingTool, _super);
        function CurvedLinkReshapingTool() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            /** @type {number} */
            _this._originalCurviness = NaN;
            return _this;
        }
        /**
        * @override
        * @this {CurvedLinkReshapingTool}
        * @param {Shape} pathshape
        * @return {Adornment}
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
                return this.makeAdornment.call(this, pathshape);
            }
        };
        ;
        /**
        * @override
        * @this {CurvedLinkReshapingTool}
        */
        CurvedLinkReshapingTool.prototype.doActivate = function () {
            _super.prototype.doActivate.call(this);
            this._originalCurviness = this.adornedLink.curviness;
        };
        ;
        /**
        * @override
        * @this {CurvedLinkReshapingTool}
        */
        CurvedLinkReshapingTool.prototype.doCancel = function () {
            this.adornedLink.curviness = this._originalCurviness;
            _super.prototype.doCancel.call(this);
        };
        ;
        /**
        * @override
        * @this {CurvedLinkReshapingTool}
        * @param {Point} newpt
        * @return {Point}
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
                if (link.fromPort === link.toPort) {
                    if (newpt.y < link.fromPort.getDocumentPoint(go.Spot.Center).y)
                        curviness = -curviness;
                }
                else {
                    var diff = mid.directionPoint(q) - ang;
                    if ((diff > 0 && diff < 180) || (diff < -180))
                        curviness = -curviness;
                }
                link.curviness = curviness;
                return q;
            }
            else {
                this.reshape.call(this, newpt);
            }
        };
        return CurvedLinkReshapingTool;
    }(go.LinkReshapingTool));
    exports.CurvedLinkReshapingTool = CurvedLinkReshapingTool;
});
