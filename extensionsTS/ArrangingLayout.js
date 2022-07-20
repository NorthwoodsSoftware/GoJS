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
    exports.ArrangingLayout = void 0;
    /*
    * This is an extension and not part of the main GoJS library.
    * Note that the API for this class may change with any version, even point releases.
    * If you intend to use an extension in production, you should copy the code to your own source directory.
    * Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
    * See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
    */
    var go = require("../release/go.js");
    /**
    * A custom Layout that provides one way to have a layout of layouts.
    * It partitions nodes and links into separate subnetworks, applies a primary
    * layout to each subnetwork, and then arranges those results by an
    * arranging layout.  Any disconnected nodes are laid out later by a
    * side layout, by default in a grid underneath the main body of subnetworks.
    *
    * If you want to experiment with this extension, try the <a href="../../extensionsJSM/Arranging.html">Arranging Layout</a> sample.
    *
    * This layout uses three separate Layouts.
    *
    * One is used for laying out nodes and links that are connected together: {@link #primaryLayout}.
    * This defaults to null and must be set to an instance of a {@link Layout},
    * such as a {@link TreeLayout} or a {@link ForceDirectedLayout} or a custom Layout.
    *
    * One is used to arrange separate subnetworks of the main graph: {@link #arrangingLayout}.
    * This defaults to an instance of {@link GridLayout}.
    *
    * One is used for laying out the additional nodes along one of the sides of the main graph: {@link #sideLayout}.
    * This also defaults to an instance of  {@link GridLayout}.
    * A filter predicate, {@link #filter}, splits up the collection of nodes and links into two subsets,
    * one for the main layout and one for the side layout.
    * By default, when there is no filter, it puts all nodes that have no link connections into the
    * subset to be processed by the side layout.
    *
    * If all pairs of nodes in the main graph can be reached by some path of undirected links,
    * there are no separate subnetworks, so the {@link #arrangingLayout} need not be used and
    * the {@link #primaryLayout} would apply to all of those nodes and links.
    *
    * But if there are disconnected subnetworks, the {@link #primaryLayout} is applied to each subnetwork,
    * and then all of those results are arranged by the {@link #arrangingLayout}.
    * If you don't want to use an {@link #arrangingLayout} and you want to force the {@link #primaryLayout} to
    * operate on all of the subnetworks, set {@link #arrangingLayout} to null.
    *
    * In either case if there are any nodes in the side graph, those are arranged by the {@link #sideLayout}
    * to be on the side of the arrangement of the main graph of nodes and links.
    * The {@link #side} property controls which side they will be placed -- the default is BottomSide.
    *
    * Note: if you do not want to have singleton nodes be arranged by {@link #sideLayout},
    * set {@link #filter} to <code>function(part) { return true; }</code>.
    * That will cause all singleton nodes to be arranged by {@link #arrangingLayout} as if they
    * were each their own subnetwork.
    *
    * If you both don't want to use {@link #sideLayout} and you don't want to use {@link #arrangingLayout}
    * to lay out connected subnetworks, don't use this ArrangingLayout at all --
    * just use whatever Layout you would have assigned to {@link #primaryLayout}.
    *
    * @category Layout Extension
    */
    var ArrangingLayout = /** @class */ (function (_super) {
        __extends(ArrangingLayout, _super);
        function ArrangingLayout() {
            var _this = _super.call(this) || this;
            _this._filter = null;
            var play = new go.GridLayout();
            play.cellSize = new go.Size(1, 1);
            _this._primaryLayout = play;
            var alay = new go.GridLayout();
            alay.cellSize = new go.Size(1, 1);
            _this._arrangingLayout = alay;
            var slay = new go.GridLayout();
            slay.cellSize = new go.Size(1, 1);
            _this._sideLayout = slay;
            _this._side = go.Spot.BottomSide;
            _this._spacing = new go.Size(20, 20);
            return _this;
        }
        /**
        * @ignore @hidden @internal
        * Copies properties to a cloned Layout.
        */
        ArrangingLayout.prototype.cloneProtected = function (copy) {
            _super.prototype.cloneProtected.call(this, copy);
            copy._filter = this._filter;
            if (this._primaryLayout !== null)
                copy._primaryLayout = this._primaryLayout.copy();
            if (this._arrangingLayout !== null)
                copy._arrangingLayout = this._arrangingLayout.copy();
            if (this._sideLayout !== null)
                copy._sideLayout = this._sideLayout.copy();
            copy._side = this._side.copy();
            copy._spacing = this._spacing.copy();
        };
        ;
        /**
        * @hidden @internal
        * @param {Diagram|Group|Iterable} coll the collection of Parts to layout.
        */
        ArrangingLayout.prototype.doLayout = function (coll) {
            var coll2 = this.collectParts(coll);
            if (coll2.count === 0)
                return;
            var diagram = this.diagram;
            if (diagram === null)
                diagram = coll2.first().diagram;
            if (diagram === null)
                return;
            // implementations of doLayout that do not make use of a LayoutNetwork
            // need to perform their own transactions
            diagram.startTransaction("Arranging Layout");
            var maincoll = new go.Set();
            var sidecoll = new go.Set();
            this.splitParts(coll2, maincoll, sidecoll);
            var mainnet = null;
            var subnets = null;
            if (this.arrangingLayout !== null) {
                this.arrangingLayout.diagram = diagram;
                mainnet = this.makeNetwork(maincoll);
                subnets = mainnet.splitIntoSubNetworks();
            }
            var bounds = null;
            if (this.arrangingLayout !== null && mainnet !== null && subnets !== null && subnets.count > 1) {
                var groups = new go.Map();
                var it = subnets.iterator;
                while (it.next()) {
                    var net = it.value;
                    var subcoll = net.findAllParts();
                    this.primaryLayout.diagram = diagram;
                    this.preparePrimaryLayout(this.primaryLayout, subcoll);
                    this.primaryLayout.doLayout(subcoll);
                    this._addMainNode(groups, subcoll, diagram);
                }
                var mit = mainnet.vertexes.iterator;
                while (mit.next()) {
                    var v = mit.value;
                    if (v.node) {
                        var subcoll = new go.Set();
                        subcoll.add(v.node);
                        this.primaryLayout.diagram = diagram;
                        this.preparePrimaryLayout(this.primaryLayout, subcoll);
                        this.primaryLayout.doLayout(subcoll);
                        this._addMainNode(groups, subcoll, diagram);
                    }
                }
                this.arrangingLayout.doLayout(groups.toKeySet());
                var git = groups.iterator;
                while (git.next()) {
                    var grp = git.key;
                    var ginfo = git.value;
                    this.moveSubgraph(ginfo.parts, ginfo.bounds, new go.Rect(grp.position, grp.desiredSize));
                }
                bounds = diagram.computePartsBounds(groups.toKeySet()); // not maincoll due to links without real bounds
            }
            else { // no this.arrangingLayout
                this.primaryLayout.diagram = diagram;
                this.preparePrimaryLayout(this.primaryLayout, maincoll);
                this.primaryLayout.doLayout(maincoll);
                bounds = diagram.computePartsBounds(maincoll);
                this.moveSubgraph(maincoll, bounds, bounds);
            }
            if (!bounds.isReal())
                bounds = new go.Rect(0, 0, 0, 0);
            this.prepareSideLayout(this.sideLayout, sidecoll, bounds);
            if (sidecoll.count > 0) {
                this.sideLayout.doLayout(sidecoll);
                var sidebounds = diagram.computePartsBounds(sidecoll);
                if (!sidebounds.isReal())
                    sidebounds = new go.Rect(0, 0, 0, 0);
                this.moveSideCollection(sidecoll, bounds, sidebounds);
            }
            diagram.commitTransaction("Arranging Layout");
        };
        ;
        /**
         * @hidden @internal
         * @param {*} subcoll
         */
        ArrangingLayout.prototype._addMainNode = function (groups, subcoll, diagram) {
            var grp = new go.Node();
            grp.locationSpot = go.Spot.Center;
            var grpb = diagram.computePartsBounds(subcoll);
            grp.desiredSize = grpb.size;
            grp.position = grpb.position;
            groups.add(grp, { parts: subcoll, bounds: grpb });
        };
        /**
         * Assign all of the Parts in the given collection into either the
         * set of Nodes and Links for the main graph or the set of Nodes and Links
         * for the side graph.
         *
         * By default this just calls the {@link #filter} on each non-Link to decide,
         * and then looks at each Link's connected Nodes to decide.
         *
         * A null filter assigns all Nodes that have connected Links to the main graph, and
         * all Links will be assigned to the main graph, and the side graph will only contain
         * Parts with no connected Links.
         * @param {Set} coll
         * @param {Set} maincoll
         * @param {Set} sidecoll
         */
        ArrangingLayout.prototype.splitParts = function (coll, maincoll, sidecoll) {
            // first consider all Nodes
            var pred = this.filter;
            coll.each(function (p) {
                if (p instanceof go.Link)
                    return;
                var main;
                if (pred)
                    main = pred(p);
                else if (p instanceof go.Node)
                    main = (p.linksConnected.count > 0);
                else
                    main = (p instanceof go.Link);
                if (main) {
                    maincoll.add(p);
                }
                else {
                    sidecoll.add(p);
                }
            });
            // now assign Links based on which Nodes they connect with
            coll.each(function (p) {
                if (p instanceof go.Link) {
                    if (!p.fromNode || !p.toNode)
                        return;
                    if (maincoll.contains(p.fromNode) && maincoll.contains(p.toNode)) {
                        maincoll.add(p);
                    }
                    else if (sidecoll.contains(p.fromNode) && sidecoll.contains(p.toNode)) {
                        sidecoll.add(p);
                    }
                }
            });
        };
        /**
         * This method is called just before the primaryLayout is performed so that
         * there can be adjustments made to the primaryLayout, if desired.
         * By default this method makes no adjustments to the primaryLayout.
         * @param {Layout} primaryLayout the sideLayout that may be modified for the results of the primaryLayout
         * @param {Set} mainColl the Nodes and Links to be laid out by primaryLayout after being separated into subnetworks
         */
        ArrangingLayout.prototype.preparePrimaryLayout = function (primaryLayout, mainColl) {
            // by default this is a no-op
        };
        /**
         * Move a Set of Nodes and Links to the given area.
         * @param {Set} subColl the Set of Nodes and Links that form a separate connected subnetwork
         * @param {Rect} subbounds the area occupied by the subColl
         * @param {Rect} bounds the area where they should be moved according to the arrangingLayout
         */
        ArrangingLayout.prototype.moveSubgraph = function (subColl, subbounds, bounds) {
            var diagram = this.diagram;
            if (!diagram)
                return;
            diagram.moveParts(subColl, bounds.position.subtract(subbounds.position));
        };
        /**
         * This method is called just after the main layouts (the primaryLayouts and arrangingLayout)
         * have been performed and just before the sideLayout is performed so that there can be
         * adjustments made to the sideLayout, if desired.
         * By default this method makes no adjustments to the sideLayout.
         * @param {Layout} sideLayout the sideLayout that may be modified for the results of the main layouts
         * @param {Set} sideColl the Nodes and Links filtered out to be laid out by sideLayout
         * @param {Rect} mainBounds the area occupied by the nodes and links of the main layout, after it was performed
         */
        ArrangingLayout.prototype.prepareSideLayout = function (sideLayout, sideColl, mainBounds) {
            // by default this is a no-op
        };
        /**
         * This method is called just after the sideLayout has been performed in order to move
         * its parts to the desired area relative to the results of the main layouts.
         * By default this calls {@link Diagram#moveParts} on the sidecoll collection to the {@link #side} of the mainbounds.
         * This won't get called if there are no Parts in the sidecoll collection.
         * @param {Set} sidecoll a collection of Parts that were laid out by the sideLayout
         * @param {Rect} mainbounds the area occupied by the results of the main layouts
         * @param {Rect} sidebounds the area occupied by the results of the sideLayout
         */
        ArrangingLayout.prototype.moveSideCollection = function (sidecoll, mainbounds, sidebounds) {
            var diagram = this.diagram;
            if (!diagram)
                return;
            var pos = null;
            if (this.side.equals(go.Spot.Bottom)) {
                pos = new go.Point(mainbounds.centerX - sidebounds.width / 2, mainbounds.y + mainbounds.height + this.spacing.height);
            }
            else if (this.side.equals(go.Spot.Right)) {
                pos = new go.Point(mainbounds.x + mainbounds.width + this.spacing.width, mainbounds.centerY - sidebounds.height / 2);
            }
            else if (this.side.equals(go.Spot.Top)) {
                pos = new go.Point(mainbounds.centerX - sidebounds.width / 2, mainbounds.y - sidebounds.height - this.spacing.height);
            }
            else if (this.side.equals(go.Spot.Left)) {
                pos = new go.Point(mainbounds.x - sidebounds.width - this.spacing.width, mainbounds.centerY - sidebounds.height / 2);
            }
            else if (this.side.includesSide(go.Spot.BottomSide)) {
                pos = new go.Point(mainbounds.x, mainbounds.y + mainbounds.height + this.spacing.height);
            }
            else if (this.side.includesSide(go.Spot.RightSide)) {
                pos = new go.Point(mainbounds.x + mainbounds.width + this.spacing.width, mainbounds.y);
            }
            else if (this.side.includesSide(go.Spot.TopSide)) {
                pos = new go.Point(mainbounds.x, mainbounds.y - sidebounds.height - this.spacing.height);
            }
            else if (this.side.includesSide(go.Spot.LeftSide)) {
                pos = new go.Point(mainbounds.x - sidebounds.width - this.spacing.width, mainbounds.y);
            }
            if (pos !== null) {
                diagram.moveParts(sidecoll, pos.subtract(sidebounds.position));
            }
        };
        Object.defineProperty(ArrangingLayout.prototype, "filter", {
            // Public properties
            /**
            * Gets or sets the predicate function to call on each non-Link.
            * If the predicate returns true, the part will be laid out by the main layouts,
            * the primaryLayouts and the arrangingLayout, otherwise by the sideLayout.
            * The default value is a function that is true when there are any links connecting with the node.
            * Such default behavior will have the sideLayout position all of the singleton nodes.
            */
            get: function () { return this._filter; },
            set: function (val) {
                if (val && typeof val !== 'function')
                    throw new Error("new value for ArrangingLayout.filter must be a function, not: " + val);
                if (this._filter !== val) {
                    this._filter = val;
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ArrangingLayout.prototype, "side", {
            /**
            * Gets or sets the side {@link Spot} where the side nodes and links should be laid out,
            * relative to the results of the main Layout.
            * The default value is Spot.BottomSide.
            *
            * If the value is Spot.Bottom, Spot.Top, Spot.Right, or Spot.Left,
            * the side nodes will be centered along that side.
            *
            * Currently only handles a single side.
            * @name ArrangingLayout#side
            * @return {Spot}
            */
            get: function () { return this._side; },
            set: function (val) {
                if (!(val instanceof go.Spot) ||
                    !(val.isSide() || val.equals(go.Spot.Top) || val.equals(go.Spot.Right) || val.equals(go.Spot.Bottom) || val.equals(go.Spot.Left))) {
                    throw new Error("new value for ArrangingLayout.side must be a side or middle-side Spot, not: " + val);
                }
                if (!this._side.equals(val)) {
                    this._side = val.copy();
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ArrangingLayout.prototype, "spacing", {
            /**
            * Gets or sets the space between the main layout and the side layout.
            * The default value is Size(20, 20).
            * @name ArrangingLayout#spacing
            * @return {Size}
            */
            get: function () { return this._spacing; },
            set: function (val) {
                if (!(val instanceof go.Size))
                    throw new Error("new value for ArrangingLayout.spacing must be a Size, not: " + val);
                if (!this._spacing.equals(val)) {
                    this._spacing = val.copy();
                    this.invalidateLayout();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ArrangingLayout.prototype, "primaryLayout", {
            /**
            * Gets or sets the Layout used for the main part of the diagram.
            * The default value is an instance of GridLayout.
            * Any new value must not be null.
            */
            get: function () { return this._primaryLayout; },
            set: function (val) {
                if (!(val instanceof go.Layout))
                    throw new Error("layout does not inherit from go.Layout: " + val);
                this._primaryLayout = val;
                this.invalidateLayout();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ArrangingLayout.prototype, "arrangingLayout", {
            /**
            * Gets or sets the Layout used to arrange multiple separate connected subnetworks of the main graph.
            * The default value is an instance of GridLayout.
            * Set this property to null in order to get the @{link #primaryLayout} to operate on all
            * connected graphs as a whole.
            */
            get: function () { return this._arrangingLayout; },
            set: function (val) {
                if (val && !(val instanceof go.Layout))
                    throw new Error("layout does not inherit from go.Layout: " + val);
                this._arrangingLayout = val;
                this.invalidateLayout();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(ArrangingLayout.prototype, "sideLayout", {
            /**
            * Gets or sets the Layout used to arrange the "side" nodes and links -- those outside of the main layout.
            * The default value is an instance of GridLayout.
            * Any new value must not be null.
            */
            get: function () { return this._sideLayout; },
            set: function (val) {
                if (!(val instanceof go.Layout))
                    throw new Error("layout does not inherit from go.Layout: " + val);
                this._sideLayout = val;
                this.invalidateLayout();
            },
            enumerable: false,
            configurable: true
        });
        return ArrangingLayout;
    }(go.Layout));
    exports.ArrangingLayout = ArrangingLayout;
});
