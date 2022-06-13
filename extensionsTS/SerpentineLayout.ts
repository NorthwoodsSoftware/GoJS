/*
*  Copyright (C) 1998-2022 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go.js';

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
export class SerpentineLayout extends go.Layout {
  private _spacing: go.Size = new go.Size(30, 30);
  private _wrap: number = NaN;
  private _root: go.Node | null = null;
  private _leftSpot: go.Spot = go.Spot.Left;
  private _rightSpot: go.Spot = go.Spot.Right;

  /**
   * Constructs a SerpentineLayout and sets the {@link #isViewportSized} property to true.
   */
  constructor() {
    super();
    this.isViewportSized = true;
  }

  /**
   * Gets or sets the {@link Size} whose width specifies the horizontal space between nodes
   * and whose height specifies the minimum vertical space between nodes.
   *
   * The default value is 30x30.
   */
  get spacing(): go.Size { return this._spacing; }
  set spacing(val: go.Size) {
    if (!(val instanceof go.Size)) throw new Error('new value for SerpentineLayout.spacing must be a Size, not: ' + val);
    if (!this._spacing.equals(val)) {
      this._spacing = val;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the total width of the layout.
   *
   * The default value is NaN, which for {@link Diagram#layout}s means that it uses
   * the {@link Diagram#viewportBounds}.
   */
  get wrap(): number { return this._wrap; }
  set wrap(val: number) {
    if (this._wrap !== val) {
      this._wrap = val;
      this.invalidateLayout();
    }
  }

 /**
  * Gets or sets the starting node of the sequence.
  *
  * The default value is null, which causes the layout to look for a node without any incoming links.
  */
  get root() { return this._root; }
  set root(val: go.Node | null) {
    if (this._root !== val) {
      this._root = val;
      this.invalidateLayout();
    }
  }

 /**
  * Gets or sets the Spot to use on the left side of a Node.
  *
  * The default value is {@link Spot.Left}.
  */
  get leftSpot() { return this._leftSpot; }
  set leftSpot(val) {
    if (this._leftSpot !== val) {
      this._leftSpot = val;
      this.invalidateLayout();
    }
  }

 /**
  * Gets or sets the Spot to use on the right side of a Node.
  *
  * The default value is {@link Spot.Right}.
  */
  get rightSpot() { return this._rightSpot; }
  set rightSpot(val) {
    if (this._rightSpot !== val) {
      this._rightSpot = val;
      this.invalidateLayout();
    }
  }

  /**
   * Copies properties to a cloned Layout.
   */
  public cloneProtected(copy: this): void {
    super.cloneProtected(copy);
    copy._spacing = this._spacing;
    copy._wrap = this._wrap;
    // don't copy _root
    copy._leftSpot = this._leftSpot;
    copy._rightSpot = this._rightSpot;
  }

  /**
   * This method actually positions all of the Nodes, assuming that the ordering of the nodes
   * is given by a single link from one node to the next.
   * This respects the {@link #spacing} and {@link #wrap} properties to affect the layout.
   * @param {Iterable.<Part>} coll A collection of {@link Part}s.
   */
  public doLayout(collection: go.Diagram | go.Iterable<go.Part> | go.Group): void {
    const diagram = this.diagram;
    const coll = this.collectParts(collection);

    let root = this.root;
    if (root === null) {
      // find a root node -- one without any incoming links
      const it = coll.iterator;
      while (it.next()) {
        const n = it.value;
        if (!(n instanceof go.Node)) continue;
        if (root === null) root = n;
        if (n.findLinksInto().count === 0) {
          root = n;
          break;
        }
      }
    }
    // couldn't find a root node
    if (root === null) return;

    const spacing = this.spacing;
    // calculate the width at which we should start a new row
    let wrap = this.wrap;
    if (diagram !== null && isNaN(wrap)) {
      if (this.group === null) {  // for a top-level layout, use the Diagram.viewportBounds
        const pad = diagram.padding as go.Margin;
        wrap = Math.max(spacing.width * 2, diagram.viewportBounds.width - 24 - pad.left - pad.right);
      } else {
        wrap = 1000; // provide a better default value?
      }
    }

    // implementations of doLayout that do not make use of a LayoutNetwork
    // need to perform their own transactions
    if (diagram !== null) diagram.startTransaction('Serpentine Layout');

    // start on the left, at Layout.arrangementOrigin
    this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
    let x = this.arrangementOrigin.x;
    let rowh = 0;
    let y = this.arrangementOrigin.y;
    let increasing = true;
    let node: go.Node | null = root;
    while (node !== null) {
      const orignode: go.Node = node;
      if (node.containingGroup !== null) node = node.containingGroup;
      const b = this.getLayoutBounds(node);
      // get the next node, if any
      let nextlink = null;
      for (const it = orignode.findLinksOutOf().iterator; it.next();) {
        if (coll.has(it.value)) { nextlink = it.value; break; }
      }
      let nextnode: go.Node | null = (nextlink !== null ? nextlink.toNode : null);
      const orignextnode = nextnode;
      if (nextnode !== null && nextnode.containingGroup !== null) nextnode = nextnode.containingGroup;
      const nb = (nextnode !== null ? this.getLayoutBounds(nextnode) : new go.Rect());
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
        } else {
          x += spacing.width;
          if (nextlink !== null) {
            nextlink.fromSpot = go.Spot.Right;
            nextlink.toSpot = go.Spot.Left;
          }
        }
      } else {
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
        } else {
          x -= spacing.width;
          if (nextlink !== null) {
            nextlink.fromSpot = go.Spot.Left;
            nextlink.toSpot = go.Spot.Right;
          }
        }
      }
      node = orignextnode;
    }

    if (diagram !== null) diagram.commitTransaction('Serpentine Layout');
  }

}
