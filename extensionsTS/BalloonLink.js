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
     * This custom {@link Link} class customizes its {@link Shape} to surround the comment node (the from node).
     * If the Shape is filled, it will obscure the comment itself unless the Link is behind the comment node.
     * Thus the default layer for BalloonLinks is "Background".
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsTS/BalloonLink.html">Balloon Links</a> sample.
     * @category Part Extension
     */
    var BalloonLink = /** @class */ (function (_super) {
        __extends(BalloonLink, _super);
        /**
         * Constructs a BalloonLink and sets the {@link Part#layerName} property to "Background".
         */
        function BalloonLink() {
            var _this = _super.call(this) || this;
            _this._base = 10;
            _this.layerName = 'Background';
            return _this;
        }
        /**
         * Copies properties to a cloned BalloonLink.
         */
        BalloonLink.prototype.cloneProtected = function (copy) {
            _super.prototype.cloneProtected.call(this, copy);
            copy._base = this._base;
        };
        Object.defineProperty(BalloonLink.prototype, "base", {
            /**
             * Gets or sets width of the base of the triangle at the center point of the {@link Link#fromNode}.
             *
             * The default value is 10.
             */
            get: function () { return this._base; },
            set: function (value) { this._base = value; },
            enumerable: true,
            configurable: true
        });
        /**
         * Produce a Geometry from the Link's route that draws a "balloon" shape around the {@link Link#fromNode}
         * and has a triangular shape with the base at the fromNode and the top at the toNode.
         */
        BalloonLink.prototype.makeGeometry = function () {
            var fromnode = this.fromNode;
            var tonode = this.toNode;
            if (fromnode === null || tonode === null)
                return _super.prototype.makeGeometry.call(this);
            // assume the fromNode is the comment and the toNode is the commented-upon node
            var bb = fromnode.actualBounds;
            var nb = tonode.actualBounds;
            var p0 = bb.center;
            var pn = this.getPoint(this.pointsCount - 1);
            if (bb.intersectsRect(nb)) {
                pn = nb.center;
            }
            var pos = this.routeBounds;
            // compute the intersection points for the triangular arrow
            var ang = pn.directionPoint(p0);
            var L = new go.Point(this.base, 0).rotate(ang - 90).add(p0);
            var R = new go.Point(this.base, 0).rotate(ang + 90).add(p0);
            this.getLinkPointFromPoint(fromnode, fromnode, L, pn, true, L);
            this.getLinkPointFromPoint(fromnode, fromnode, R, pn, true, R);
            // form a triangular arrow from the comment to the commented node
            var fig = new go.PathFigure(pn.x - pos.x, pn.y - pos.y, true); // filled; start at arrow point at commented node
            fig.add(new go.PathSegment(go.PathSegment.Line, R.x - pos.x, R.y - pos.y)); // a triangle base point on comment's edge
            var side = 0;
            if (L.y >= bb.bottom || R.y >= bb.bottom)
                side = 2;
            else if (L.x <= bb.x && R.x <= bb.x)
                side = 1;
            else if (L.x >= bb.right && R.x >= bb.right)
                side = 3;
            this.pathToCorner(side, bb, fig, pos, L, R);
            this.pathToCorner(side + 1, bb, fig, pos, L, R);
            this.pathToCorner(side + 2, bb, fig, pos, L, R);
            this.pathToCorner(side + 3, bb, fig, pos, L, R);
            fig.add(new go.PathSegment(go.PathSegment.Line, L.x - pos.x, L.y - pos.y).close()); // the other triangle base point on comment's edge
            // return a Geometry
            return new go.Geometry().add(fig);
        };
        /**
         * Draw a line to a corner, but not if the comment arrow encompasses that corner.
         */
        BalloonLink.prototype.pathToCorner = function (side, bb, fig, pos, L, R) {
            switch (side % 4) {
                case 0:
                    if (!(L.y <= bb.y && R.x <= bb.x))
                        fig.add(new go.PathSegment(go.PathSegment.Line, bb.x - pos.x, bb.y - pos.y));
                    break;
                case 1:
                    if (!(L.x <= bb.x && R.y >= bb.bottom))
                        fig.add(new go.PathSegment(go.PathSegment.Line, bb.x - pos.x, bb.bottom - pos.y));
                    break;
                case 2:
                    if (!(L.y >= bb.bottom && R.x >= bb.right))
                        fig.add(new go.PathSegment(go.PathSegment.Line, bb.right - pos.x, bb.bottom - pos.y));
                    break;
                case 3:
                    if (!(L.x >= bb.right && R.y <= bb.y))
                        fig.add(new go.PathSegment(go.PathSegment.Line, bb.right - pos.x, bb.y - pos.y));
                    break;
            }
        };
        return BalloonLink;
    }(go.Link));
    exports.BalloonLink = BalloonLink;
});
