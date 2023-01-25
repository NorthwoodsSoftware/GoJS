/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
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
    exports.SerpentineLayout = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
     * A custom {@link Layout} that lays out a chain of nodes in a snake-like fashion.
     *
     * This layout assumes the graph is a chain of Nodes,
     * positioning nodes in horizontal rows back and forth, alternating between left-to-right
     * and right-to-left within the {@link #wrap} limit.
     * {@link #spacing} controls the distance between nodes.
     * {@link #leftSpot} and {@link #rightSpot} determine the Spots to use for the {@link Link#fromSpot} and {@link Link#toSpot}.
     *
     * When this layout is the Diagram.layout, it is automatically invalidated when the viewport changes size.
     *
     * If you want to experiment with this extension, try the <a href="../../extensionsJSM/Serpentine.html">Serpentine Layout</a> sample.
     * @category Layout Extension
     */
    var SerpentineLayout = /** @class */ (function (_super) {
        __extends(SerpentineLayout, _super);
        /**
         * Constructs a SerpentineLayout and sets the {@link #isViewportSized} property to true.
         */
        function SerpentineLayout() {
            var _this = _super.call(this) || this;
            _this._spacing = new go.Size(30, 30);
            _this._wrap = NaN;
            _this._root = null;
            _this._leftSpot = go.Spot.Left;
            _this._rightSpot = go.Spot.Right;
            _this.isViewportSized = true;
            return _this;
        }
        Object.defineProperty(SerpentineLayout.prototype, "spacing", {
            /**
             * Gets or sets the {@link Size} whose width specifies the horizontal space between nodes
             * and whose height specifies the minimum vertical space between nodes.
             *
             * The default value is 30x30.
             */
            get: function () { return this._spacing; },
            set: function (val) {
                if (!(val instanceof go.Size))
                    throw new Error('new value for SerpentineLayout.spacing must be a Size, not: ' + val);
                if (!this._spacing.equals(val)) {
                    this._spacing = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SerpentineLayout.prototype, "wrap", {
            /**
             * Gets or sets the total width of the layout.
             *
             * The default value is NaN, which for {@link Diagram#layout}s means that it uses
             * the {@link Diagram#viewportBounds}.
             */
            get: function () { return this._wrap; },
            set: function (val) {
                if (this._wrap !== val) {
                    this._wrap = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SerpentineLayout.prototype, "root", {
            /**
             * Gets or sets the starting node of the sequence.
             *
             * The default value is null, which causes the layout to look for a node without any incoming links.
             */
            get: function () { return this._root; },
            set: function (val) {
                if (this._root !== val) {
                    this._root = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SerpentineLayout.prototype, "leftSpot", {
            /**
             * Gets or sets the Spot to use on the left side of a Node.
             *
             * The default value is {@link Spot.Left}.
             */
            get: function () { return this._leftSpot; },
            set: function (val) {
                if (this._leftSpot !== val) {
                    this._leftSpot = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SerpentineLayout.prototype, "rightSpot", {
            /**
             * Gets or sets the Spot to use on the right side of a Node.
             *
             * The default value is {@link Spot.Right}.
             */
            get: function () { return this._rightSpot; },
            set: function (val) {
                if (this._rightSpot !== val) {
                    this._rightSpot = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Copies properties to a cloned Layout.
         */
        SerpentineLayout.prototype.cloneProtected = function (copy) {
            _super.prototype.cloneProtected.call(this, copy);
            copy._spacing = this._spacing;
            copy._wrap = this._wrap;
            // don't copy _root
            copy._leftSpot = this._leftSpot;
            copy._rightSpot = this._rightSpot;
        };
        /**
         * This method actually positions all of the Nodes, assuming that the ordering of the nodes
         * is given by a single link from one node to the next.
         * This respects the {@link #spacing} and {@link #wrap} properties to affect the layout.
         * @param {Iterable.<Part>} coll A collection of {@link Part}s.
         */
        SerpentineLayout.prototype.doLayout = function (collection) {
            var diagram = this.diagram;
            var coll = this.collectParts(collection);
            var root = this.root;
            if (root === null) {
                // find a root node -- one without any incoming links
                var it = coll.iterator;
                while (it.next()) {
                    var n = it.value;
                    if (!(n instanceof go.Node))
                        continue;
                    if (root === null)
                        root = n;
                    if (n.findLinksInto().count === 0) {
                        root = n;
                        break;
                    }
                }
            }
            // couldn't find a root node
            if (root === null)
                return;
            var spacing = this.spacing;
            // calculate the width at which we should start a new row
            var wrap = this.wrap;
            if (diagram !== null && isNaN(wrap)) {
                if (this.group === null) { // for a top-level layout, use the Diagram.viewportBounds
                    var pad = diagram.padding;
                    wrap = Math.max(spacing.width * 2, diagram.viewportBounds.width - 24 - pad.left - pad.right);
                }
                else {
                    wrap = 1000; // provide a better default value?
                }
            }
            // implementations of doLayout that do not make use of a LayoutNetwork
            // need to perform their own transactions
            if (diagram !== null)
                diagram.startTransaction('Serpentine Layout');
            // start on the left, at Layout.arrangementOrigin
            this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
            var x = this.arrangementOrigin.x;
            var rowh = 0;
            var y = this.arrangementOrigin.y;
            var increasing = true;
            var node = root;
            while (node !== null) {
                var orignode = node;
                if (node.containingGroup !== null)
                    node = node.containingGroup;
                var b = this.getLayoutBounds(node);
                // get the next node, if any
                var nextlink = null;
                for (var it = orignode.findLinksOutOf().iterator; it.next();) {
                    if (coll.has(it.value)) {
                        nextlink = it.value;
                        break;
                    }
                }
                var nextnode = (nextlink !== null ? nextlink.toNode : null);
                var orignextnode = nextnode;
                if (nextnode !== null && nextnode.containingGroup !== null)
                    nextnode = nextnode.containingGroup;
                var nb = (nextnode !== null ? this.getLayoutBounds(nextnode) : new go.Rect());
                if (increasing) {
                    node.move(new go.Point(x, y));
                    x += b.width;
                    rowh = Math.max(rowh, b.height);
                    if (x + spacing.width + nb.width > wrap) {
                        y += rowh + spacing.height;
                        x = wrap - spacing.width;
                        rowh = 0;
                        increasing = false;
                        if (nextlink !== null) {
                            nextlink.fromSpot = go.Spot.Right;
                            nextlink.toSpot = go.Spot.Right;
                        }
                    }
                    else {
                        x += spacing.width;
                        if (nextlink !== null) {
                            nextlink.fromSpot = go.Spot.Right;
                            nextlink.toSpot = go.Spot.Left;
                        }
                    }
                }
                else {
                    x -= b.width;
                    node.move(new go.Point(x, y));
                    rowh = Math.max(rowh, b.height);
                    if (x - spacing.width - nb.width < 0) {
                        y += rowh + spacing.height;
                        x = 0;
                        rowh = 0;
                        increasing = true;
                        if (nextlink !== null) {
                            nextlink.fromSpot = go.Spot.Left;
                            nextlink.toSpot = go.Spot.Left;
                        }
                    }
                    else {
                        x -= spacing.width;
                        if (nextlink !== null) {
                            nextlink.fromSpot = go.Spot.Left;
                            nextlink.toSpot = go.Spot.Right;
                        }
                    }
                }
                node = orignextnode;
            }
            if (diagram !== null)
                diagram.commitTransaction('Serpentine Layout');
        };
        return SerpentineLayout;
    }(go.Layout));
    exports.SerpentineLayout = SerpentineLayout;
});
