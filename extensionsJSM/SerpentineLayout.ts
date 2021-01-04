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
 * A custom {@link Layout} that lays out a chain of nodes in a snake-like fashion.
 *
 * This layout assumes the graph is a chain of Nodes,
 * positioning nodes in horizontal rows back and forth, alternating between left-to-right
 * and right-to-left within the {@link #wrap} limit.
 * {@link #spacing} controls the distance between nodes.
 *
 * When this layout is the Diagram.layout, it is automatically invalidated when the viewport changes size.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsTS/Serpentine.html">Serpentine Layout</a> sample.
 * @category Layout Extension
 */
export class SerpentineLayout extends go.Layout {
  private _spacing: go.Size = new go.Size(30, 30);
  private _wrap: number = NaN;

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
   * Copies properties to a cloned Layout.
   */
  public cloneProtected(copy: this): void {
    super.cloneProtected(copy);
    copy._spacing = this._spacing;
    copy._wrap = this._wrap;
  }

  /**
   * This method actually positions all of the Nodes, assuming that the ordering of the nodes
   * is given by a single link from one node to the next.
   * This respects the {@link #spacing} and {@link #wrap} properties to affect the layout.
   * @param {Iterable.<Part>} coll A collection of {@link Part}s.
   */
  public doLayout(coll: go.Iterable<go.Part>): void {
    const diagram = this.diagram;
    coll = this.collectParts(coll);

    let root = null;
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
      const b = this.getLayoutBounds(node);
      // get the next node, if any
      const nextlink: go.Link | null = node.findLinksOutOf().first();
      const nextnode: go.Node | null = (nextlink !== null ? nextlink.toNode : null);
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
      node = nextnode;
    }

    if (diagram !== null) diagram.commitTransaction('Serpentine Layout');
  }

}
