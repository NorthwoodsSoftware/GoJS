/*
*  Copyright (C) 1998-2021 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsTS folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go-module.js';

/**
* A custom Layout that provides one way to have a layout of layouts.
* It partitions nodes and links into separate subgraphs, applies a primary
* layout to each subgraph, and then arranges those results by an
* arranging layout.  Any disconnected nodes are laid out later by a
* side layout, by default in a grid underneath the main body of subgraphs.
*
* If you want to experiment with this extension, try the <a href="../../extensionsTS/Arranging.html">Arranging Layout</a> sample.
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
*
* In either case if there are any nodes in the side graph, those are arranged by the {@link #sideLayout}
* to be on the side of the arrangement of the main graph of nodes and links.
*
* Note: if you do not want to have singleton nodes be arranged by {@link #sideLayout},
* set {@link #filter} to <code>function(part) { return true; }</code>.
* That will cause all singleton nodes to be arranged by {@link #arrangingLayout} as if they
* were each their own subgraph.
*
* If you both don't want to use {@link #sideLayout} and you don't want to use {@link #arrangingLayout}
* to lay out connected subgraphs, don't use this ArrangingLayout at all --
* just use whatever Layout you would have assigned to {@link #primaryLayout}.
*
* @category Layout Extension
*/
export class ArrangingLayout extends go.Layout {
  private _filter: ((part: go.Part) => boolean) | null = null;
  private _primaryLayout: go.Layout;
  private _arrangingLayout: go.Layout;
  private _sideLayout: go.Layout;
  private _side: go.Spot = go.Spot.BottomSide;
  private _spacing: go.Size = new go.Size(20, 20);

  constructor() {
    super();
    const play = new go.GridLayout();
    play.cellSize = new go.Size(1, 1);
    this._primaryLayout = play;
    const alay = new go.GridLayout();
    alay.cellSize = new go.Size(1, 1);
    this._arrangingLayout = alay;
    const slay = new go.GridLayout();
    slay.cellSize = new go.Size(1, 1);
    this._sideLayout = slay;
  }

  /**
  * @ignore @hidden @internal
  * Copies properties to a cloned Layout.
  */
  cloneProtected(copy: this): void {
    super.cloneProtected(copy);
    copy._filter = this._filter;
    if (this._primaryLayout !== null) copy._primaryLayout = this._primaryLayout.copy();
    if (this._arrangingLayout !== null) copy._arrangingLayout = this._arrangingLayout.copy();
    if (this._sideLayout !== null) copy._sideLayout = this._sideLayout.copy();
    copy._side = this._side.copy();
    copy._spacing = this._spacing.copy();
  };

  /**
  * @hidden @internal
  * @param {Diagram|Group|Iterable} coll the collection of Parts to layout.
  */
  doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>) {
    const coll2 = this.collectParts(coll);

    const diagram = this.diagram;
    if (diagram === null) throw new Error("No Diagram for this Layout");

    // implementations of doLayout that do not make use of a LayoutNetwork
    // need to perform their own transactions
    diagram.startTransaction("Arranging Layout");

    const maincoll = new go.Set<go.Part>();
    const sidecoll = new go.Set<go.Part>();
    this.splitParts(coll2, maincoll, sidecoll);

    let mainnet = null;
    let subnets = null;
    if (this.arrangingLayout !== null) {
      mainnet = this.makeNetwork(maincoll);
      subnets = mainnet.splitIntoSubNetworks();
    }
    let bounds = null;
    if (this.arrangingLayout !== null && mainnet !== null && subnets !== null && subnets.count > 1) {
      const groups = new go.Map<go.Part, { parts: go.Set<go.Part>, bounds: go.Rect }>();
      const it = subnets.iterator;
      while (it.next()) {
        const net = it.value;
        const subcoll = net.findAllParts();
        this.preparePrimaryLayout(this.primaryLayout, subcoll);
        this.primaryLayout.doLayout(subcoll);
        this._addMainNode(groups, subcoll, diagram);
      }
      const mit = mainnet.vertexes.iterator;
      while (mit.next()) {
        const v = mit.value;
        if (v.node) {
          const subcoll = new go.Set<go.Part>();
          subcoll.add(v.node);
          this.preparePrimaryLayout(this.primaryLayout, subcoll);
          this.primaryLayout.doLayout(subcoll);
          this._addMainNode(groups, subcoll, diagram);
        }
      }

      this.arrangingLayout.doLayout(groups.toKeySet());
      const git = groups.iterator;
      while (git.next()) {
        const grp = git.key;
        const ginfo = git.value;
        this.moveSubgraph(ginfo.parts, ginfo.bounds, new go.Rect(grp.position, grp.desiredSize));
      }
      bounds = diagram.computePartsBounds(groups.toKeySet());  // not maincoll due to links without real bounds
    } else {  // no this.arrangingLayout
      this.preparePrimaryLayout(this.primaryLayout, maincoll);
      this.primaryLayout.doLayout(maincoll);
      bounds = diagram.computePartsBounds(maincoll);
      this.moveSubgraph(maincoll, bounds, bounds);
    }
    if (!bounds.isReal()) bounds = new go.Rect(0, 0, 0, 0);

    this.prepareSideLayout(this.sideLayout, sidecoll, bounds);
    if (sidecoll.count > 0) {
      this.sideLayout.doLayout(sidecoll);
      let sidebounds = diagram.computePartsBounds(sidecoll);
      if (!sidebounds.isReal()) sidebounds = new go.Rect(0, 0, 0, 0);

      this.moveSideCollection(sidecoll, bounds, sidebounds);
    }

    diagram.commitTransaction("Arranging Layout");
  };

  /**
   * @hidden @internal
   * @param {*} subcoll 
   */
  _addMainNode(groups: go.Map<go.Part, { parts: go.Set<go.Part>, bounds: go.Rect }>, subcoll: go.Set<go.Part>, diagram: go.Diagram) {
    const grp = new go.Node();
    grp.locationSpot = go.Spot.Center;
    const grpb = diagram.computePartsBounds(subcoll);
    grp.desiredSize = grpb.size;
    grp.position = grpb.position;
    groups.add(grp, { parts: subcoll, bounds: grpb });
  }

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
  splitParts(coll: go.Set<go.Part>, maincoll: go.Set<go.Part>, sidecoll: go.Set<go.Part>) {
    // first consider all Nodes
    const pred = this.filter;
    coll.each(function(p) {
        if (p instanceof go.Link) return;
        let main;
        if (pred) main = pred(p);
        else if (p instanceof go.Node) main = (p.linksConnected.count > 0);
        else main = (p instanceof go.Link);
        if (main) {
          maincoll.add(p);
        } else {
          sidecoll.add(p);
        }
      });
    // now assign Links based on which Nodes they connect with
    coll.each(function(p) {
        if (p instanceof go.Link) {
          if (!p.fromNode || !p.toNode) return;
          if (maincoll.contains(p.fromNode) && maincoll.contains(p.toNode)) {
            maincoll.add(p);
          } else if (sidecoll.contains(p.fromNode) && sidecoll.contains(p.toNode)) {
            sidecoll.add(p);
          }
        }
      });
  }

  /**
   * This method is called just before the primaryLayout is performed so that
   * there can be adjustments made to the primaryLayout, if desired.
   * By default this method makes no adjustments to the primaryLayout.
   * @param {Layout} primaryLayout the sideLayout that may be modified for the results of the primaryLayout
   * @param {Set} mainColl the Nodes and Links to be laid out by primaryLayout after being separated into subnetworks
   */
  preparePrimaryLayout(primaryLayout: go.Layout, mainColl: go.Set<go.Part>) {
    // by default this is a no-op
  }

  /**
   * Move a Set of Nodes and Links to the given area.
   * @param {Set} subColl the Set of Nodes and Links that form a separate connected subgraph
   * @param {Rect} subbounds the area occupied by the subColl
   * @param {Rect} bounds the area where they should be moved according to the arrangingLayout
   */
  moveSubgraph(subColl: go.Set<go.Part>, subbounds: go.Rect, bounds: go.Rect) {
    const diagram = this.diagram;
    if (!diagram) return;
    diagram.moveParts(subColl, bounds.position.subtract(subbounds.position), false);
  }

  /**
   * This method is called just after the main layouts (the primaryLayouts and arrangingLayout)
   * have been performed and just before the sideLayout is performed so that there can be
   * adjustments made to the sideLayout, if desired.
   * By default this method makes no adjustments to the sideLayout.
   * @param {Layout} sideLayout the sideLayout that may be modified for the results of the main layouts
   * @param {Set} sideColl the Nodes and Links filtered out to be laid out by sideLayout
   * @param {Rect} mainBounds the area occupied by the nodes and links of the main layout, after it was performed
   */
  prepareSideLayout(sideLayout: go.Layout, sideColl: go.Set<go.Part>, mainBounds: go.Rect) {
    // by default this is a no-op
  }

  /**
   * This method is called just after the sideLayout has been performed in order to move
   * its parts to the desired area relative to the results of the main layouts.
   * By default this calls {@link Diagram#moveParts} on the sidecoll collection to the {@link #side} of the mainbounds.
   * This won't get called if there are no Parts in the sidecoll collection.
   * @param {Set} sidecoll a collection of Parts that were laid out by the sideLayout
   * @param {Rect} mainbounds the area occupied by the results of the main layouts
   * @param {Rect} sidebounds the area occupied by the results of the sideLayout
   */
  moveSideCollection(sidecoll: go.Set<go.Part>, mainbounds: go.Rect, sidebounds: go.Rect) {
    const diagram = this.diagram;
    if (!diagram) return;
    if (this.side.includesSide(go.Spot.BottomSide)) {
      diagram.moveParts(sidecoll, new go.Point(mainbounds.x - sidebounds.x, mainbounds.y + mainbounds.height + this.spacing.height - sidebounds.y), false);
    } else if (this.side.includesSide(go.Spot.RightSide)) {
      diagram.moveParts(sidecoll, new go.Point(mainbounds.x + mainbounds.width + this.spacing.width - sidebounds.x, mainbounds.y - sidebounds.y), false);
    } else if (this.side.includesSide(go.Spot.TopSide)) {
      diagram.moveParts(sidecoll, new go.Point(mainbounds.x - sidebounds.x, mainbounds.y - sidebounds.height - this.spacing.height - sidebounds.y), false);
    } else if (this.side.includesSide(go.Spot.LeftSide)) {
      diagram.moveParts(sidecoll, new go.Point(mainbounds.x - sidebounds.width - this.spacing.width - sidebounds.x, mainbounds.y - sidebounds.y), false);
    }
  }

  // Public properties

  /**
  * Gets or sets the predicate function to call on each non-Link.
  * If the predicate returns true, the part will be laid out by the main layouts,
  * the primaryLayouts and the arrangingLayout, otherwise by the sideLayout.
  * The default value is a function that is true when there are any links connecting with the node.
  * Such default behavior will have the sideLayout position all of the singleton nodes.
  */
  get filter(): ((part: go.Part) => boolean) | null { return this._filter; }
  set filter(val: ((part: go.Part) => boolean) | null) {
    if (val && typeof val !== 'function') throw new Error("new value for ArrangingLayout.filter must be a function, not: " + val);
    if (this._filter !== val) {
      this._filter = val;
      this.invalidateLayout();
    }
  }

  /**
  * Gets or sets the side {@link Spot} where the side nodes and links should be laid out,
  * relative to the results of the main Layout.
  * The default value is Spot.BottomSide.
  * Currently only handles a single side.
  * @name ArrangingLayout#side
  
  * @return {Spot}
  */
  get side(): go.Spot { return this._side; }
  set side(val: go.Spot) {
    if (!(val instanceof go.Spot) || !val.isSide()) {
      throw new Error("new value for ArrangingLayout.side must be a side Spot, not: " + val);
    }
    if (!this._side.equals(val)) {
      this._side = val.copy();
      this.invalidateLayout();
    }
  }

  /**
  * Gets or sets the space between the main layout and the side layout.
  * The default value is Size(20, 20).
  * @name ArrangingLayout#spacing
  
  * @return {Size}
  */
  get spacing(): go.Size { return this._spacing; }
  set spacing(val: go.Size) {
    if (!(val instanceof go.Size)) throw new Error("new value for ArrangingLayout.spacing must be a Size, not: " + val);
    if (!this._spacing.equals(val)) {
      this._spacing = val.copy();
      this.invalidateLayout();
    }
  }

  /**
  * Gets or sets the Layout used for the main part of the diagram.
  * The default value is an instance of GridLayout.
  * Any new value must not be null.
  */
  get primaryLayout(): go.Layout { return this._primaryLayout; }
  set primaryLayout(val: go.Layout) {
    if (!(val instanceof go.Layout)) throw new Error("layout does not inherit from go.Layout: " + val);
    this._primaryLayout = val;
    this.invalidateLayout();
  }

  /**
  * Gets or sets the Layout used to arrange multiple separate connected subgraphs of the main graph.
  * The default value is an instance of GridLayout.
  * Set this property to null in order to get the default behavior of the @{link #primaryLayout}
  * when dealing with multiple connected graphs as a whole.
  */
  get arrangingLayout(): go.Layout { return this._arrangingLayout; }
  set arrangingLayout(val: go.Layout) {
    if (val && !(val instanceof go.Layout)) throw new Error("layout does not inherit from go.Layout: " + val);
    this._arrangingLayout = val;
    this.invalidateLayout();
  }

  /**
  * Gets or sets the Layout used to arrange the "side" nodes and links -- those outside of the main layout.
  * The default value is an instance of GridLayout.
  * Any new value must not be null.
  */
  get sideLayout(): go.Layout { return this._sideLayout; }
  set sideLayout(val: go.Layout) {
    if (!(val instanceof go.Layout)) throw new Error("layout does not inherit from go.Layout: " + val);
    this._sideLayout = val;
    this.invalidateLayout();
  }
}
