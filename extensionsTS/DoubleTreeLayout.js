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
    exports.DoubleTreeLayout = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * Perform two TreeLayouts, one going rightwards and one going leftwards.
     * The choice of direction is determined by the mandatory predicate {@link #directionFunction},
     * which is called on each child Node of the root Node.
     *
     * You can also set {@link #vertical} to true if you want the DoubleTreeLayout to
     * perform TreeLayouts both downwards and upwards.
     *
     * Normally there should be a single root node.  Hoewver if there are multiple root nodes
     * found in the nodes and links that this layout is responsible for, this will pretend that
     * there is a real root node and make all of the apparent root nodes children of that pretend root.
     *
     * If there is no root node, all nodes are involved in cycles, so the first given node is chosen.
     *
     * If you want to experiment with this extension, try the <a href="../../samples/doubleTree.html">Double Tree</a> sample.
     * @category Layout Extension
     */
    var DoubleTreeLayout = /** @class */ (function (_super) {
        __extends(DoubleTreeLayout, _super);
        function DoubleTreeLayout() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._vertical = false;
            _this._directionFunction = function (node) { return true; };
            _this._bottomRightOptions = null;
            _this._topLeftOptions = null;
            return _this;
        }
        Object.defineProperty(DoubleTreeLayout.prototype, "vertical", {
            /**
            * When false, the layout should grow towards the left and towards the right;
            * when true, the layout show grow upwards and downwards.
            * The default value is false.
            */
            get: function () { return this._vertical; },
            set: function (value) {
                if (typeof value !== "boolean")
                    throw new Error("new value for DoubleTreeLayout.vertical must be a boolean value.");
                if (this._vertical !== value) {
                    this._vertical = value;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DoubleTreeLayout.prototype, "directionFunction", {
            /**
            * This function is called on each child node of the root node
            * in order to determine whether the subtree starting from that child node
            * will grow towards larger coordinates or towards smaller ones.
            * The value must be a function and must not be null.
            * It must return true if {@link #isPositiveDirection} should return true; otherwise it should return false.
            */
            get: function () { return this._directionFunction; },
            set: function (value) {
                if (typeof value !== "function") {
                    throw new Error("new value for DoubleTreeLayout.directionFunction must be a function taking a node data object and returning a boolean.");
                }
                if (this._directionFunction !== value) {
                    this._directionFunction = value;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DoubleTreeLayout.prototype, "bottomRightOptions", {
            /**
             * Gets or sets the options to be applied to a {@link TreeLayout}.
             * By default this is null -- no properties are set on the TreeLayout
             * other than the {@link TreeLayout#angle}, depending on {@link #vertical} and
             * the result of calling {@link #directionFunction}.
             */
            get: function () { return this._bottomRightOptions; },
            set: function (value) {
                if (this._bottomRightOptions !== value) {
                    this._bottomRightOptions = value;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(DoubleTreeLayout.prototype, "topLeftOptions", {
            /**
             * Gets or sets the options to be applied to a {@link TreeLayout}.
             * By default this is null -- no properties are set on the TreeLayout
             * other than the {@link TreeLayout#angle}, depending on {@link #vertical} and
             * the result of calling {@link #directionFunction}.
             */
            get: function () { return this._topLeftOptions; },
            set: function (value) {
                if (this._topLeftOptions !== value) {
                    this._topLeftOptions = value;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
        * @ignore
        * Copies properties to a cloned Layout.
        */
        DoubleTreeLayout.prototype.cloneProtected = function (copy) {
            _super.prototype.cloneProtected.call(this, copy);
            copy._vertical = this._vertical;
            copy._directionFunction = this._directionFunction;
            copy._bottomRightOptions = this._bottomRightOptions;
            copy._topLeftOptions = this._topLeftOptions;
        };
        /**
         * Perform two {@link TreeLayout}s by splitting the collection of Parts
         * into two separate subsets but sharing only a single root Node.
         * @param coll
         */
        DoubleTreeLayout.prototype.doLayout = function (coll) {
            var coll2 = this.collectParts(coll);
            if (coll2.count === 0)
                return;
            var diagram = this.diagram;
            if (diagram !== null)
                diagram.startTransaction("Double Tree Layout");
            // split the nodes and links into two Sets, depending on direction
            var leftParts = new go.Set();
            var rightParts = new go.Set();
            this.separatePartsForLayout(coll2, leftParts, rightParts);
            // but the ROOT node will be in both collections
            // create and perform two TreeLayouts, one in each direction,
            // without moving the ROOT node, on the different subsets of nodes and links
            var layout1 = this.createTreeLayout(false);
            layout1.angle = this.vertical ? 270 : 180;
            layout1.arrangement = go.TreeLayout.ArrangementFixedRoots;
            var layout2 = this.createTreeLayout(true);
            layout2.angle = this.vertical ? 90 : 0;
            layout2.arrangement = go.TreeLayout.ArrangementFixedRoots;
            layout1.doLayout(leftParts);
            layout2.doLayout(rightParts);
            if (diagram !== null)
                diagram.commitTransaction("Double Tree Layout");
        };
        /**
         * This just returns an instance of {@link TreeLayout}.
         * The caller will set the {@link TreeLayout#angle}.
         * @param {boolean} positive true for growth downward or rightward
         * @return {TreeLayout}
         */
        DoubleTreeLayout.prototype.createTreeLayout = function (positive) {
            var lay = new go.TreeLayout();
            var opts = this.topLeftOptions;
            if (positive)
                opts = this.bottomRightOptions;
            if (opts)
                for (var p in opts) {
                    lay[p] = opts[p];
                }
            return lay;
        };
        /**
         * This is called by {@link #doLayout} to split the collection of Nodes and Links into two Sets,
         * one for the subtrees growing towards the left or upwards, and one for the subtrees
         * growing towards the right or downwards.
         */
        DoubleTreeLayout.prototype.separatePartsForLayout = function (coll, leftParts, rightParts) {
            var root = null; // the one root
            var roots = new go.Set(); // in case there are multiple roots
            coll.each(function (node) {
                if (node instanceof go.Node && node.findTreeParentNode() === null)
                    roots.add(node);
            });
            if (roots.count === 0) { // just choose the first node as the root
                var it = coll.iterator;
                while (it.next()) {
                    if (it.value instanceof go.Node) {
                        root = it.value;
                        break;
                    }
                }
            }
            else if (roots.count === 1) { // normal case: just one root node
                root = roots.first();
            }
            else { // multiple root nodes -- create a dummy node to be the one real root
                root = new go.Node(); // the new root node
                root.location = new go.Point(0, 0);
                var forwards_1 = (this.diagram ? this.diagram.isTreePathToChildren : true);
                // now make dummy links from the one root node to each node
                roots.each(function (child) {
                    var link = new go.Link();
                    if (forwards_1) {
                        link.fromNode = root;
                        link.toNode = child;
                    }
                    else {
                        link.fromNode = child;
                        link.toNode = root;
                    }
                });
            }
            if (root === null)
                return;
            // the ROOT node is shared by both subtrees
            leftParts.add(root);
            rightParts.add(root);
            var lay = this;
            // look at all of the immediate children of the ROOT node
            root.findTreeChildrenNodes().each(function (child) {
                // in what direction is this child growing?
                var bottomright = lay.isPositiveDirection(child);
                var parts = bottomright ? rightParts : leftParts;
                // add the whole subtree starting with this child node
                parts.addAll(child.findTreeParts());
                // and also add the link from the ROOT node to this child node
                var plink = child.findTreeParentLink();
                if (plink !== null)
                    parts.add(plink);
            });
        };
        /**
         * This predicate is called on each child node of the root node,
         * and only on immediate children of the root.
         * It should return true if this child node is the root of a subtree that should grow
         * rightwards or downwards, or false otherwise.
         * @param {Node} child
         * @returns {boolean} true if grows towards right or towards bottom; false otherwise
         */
        DoubleTreeLayout.prototype.isPositiveDirection = function (child) {
            var f = this.directionFunction;
            if (!f)
                throw new Error("No DoubleTreeLayout.directionFunction supplied on the layout");
            return f(child);
        };
        return DoubleTreeLayout;
    }(go.Layout));
    exports.DoubleTreeLayout = DoubleTreeLayout;
});
