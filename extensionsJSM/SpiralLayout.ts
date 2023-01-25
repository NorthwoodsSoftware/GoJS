/*
*  Copyright (C) 1998-2023 by Northwoods Software Corporation. All Rights Reserved.
*/

/*
* This is an extension and not part of the main GoJS library.
* Note that the API for this class may change with any version, even point releases.
* If you intend to use an extension in production, you should copy the code to your own source directory.
* Extensions can be found in the GoJS kit under the extensions or extensionsJSM folders.
* See the Extensions intro page (https://gojs.net/latest/intro/extensions.html) for more information.
*/

import * as go from '../release/go-module.js';

/**
 * A custom {@link Layout} that lays out a chain of nodes in a spiral.
 *
 * This layout assumes the graph is a chain of {@link Node}s,
 * {@link #spacing} controls the spacing between nodes.
 *
 * If you want to experiment with this extension, try the <a href="../../extensionsJSM/Spiral.html">Spiral Layout</a> sample.
 * @category Layout Extension
 */
export class SpiralLayout extends go.Layout {
  private _radius: number = NaN;
  private _spacing: number = 10;
  private _clockwise: boolean = true;

  /**
   * Gets or sets the radius distance.
   *
   * The default value is NaN.
   */
  get radius(): number { return this._radius; }
  set radius(val: number) {
    if (typeof val !== 'number') throw new Error('new value ofr SpiralLayout.radius must be a number, not ' + val);
    if (this._radius !== val) {
      this._radius = val;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets the spacing between nodes.
   *
   * The default value is 100.
   */
  get spacing(): number { return this._spacing; }
  set spacing(val: number) {
    if (typeof val !== 'number') throw new Error('new value for SpiralLayout.spacing must be a number, not: ' + val);
    if (this._spacing !== val) {
      this._spacing = val;
      this.invalidateLayout();
    }
  }

  /**
   * Gets or sets whether the spiral should go clockwise or counter-clockwise.
   *
   * The default value is true.
   */
  get clockwise(): boolean { return this._clockwise; }
  set clockwise(val: boolean) {
    if (typeof val !== 'boolean') throw new Error('new value for SpiralLayout.clockwise must be a boolean, not: ' + val);
    if (this._clockwise !== val) {
      this._clockwise = val;
      this.invalidateLayout();
    }
  }

  /**
   * Copies properties to a cloned Layout.
   */
  public override cloneProtected(copy: this): void {
    super.cloneProtected(copy);
    copy._radius = this._radius;
    copy._spacing = this._spacing;
    copy._clockwise = this._clockwise;
  }

  /**
   * This method actually positions all of the Nodes, assuming that the ordering of the nodes
   * is given by a single link from one node to the next.
   * This respects the {@link #spacing} property to affect the layout.
   * @param {Diagram|Group|Iterable.<Part>} coll A {@link Diagram} or a {@link Group} or a collection of {@link Part}s.
   */
  public override doLayout(coll: go.Diagram | go.Group | go.Iterable<go.Part>): void {
    if (this.network === null) {
      this.network = this.makeNetwork(coll);
    }
    this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
    const originx = this.arrangementOrigin.x;
    const originy = this.arrangementOrigin.y;
    let root = null;
    // find a root vertex -- one without any incoming edges
    const it = this.network.vertexes.iterator;
    while (it.next()) {
      const v = it.value;
      if (root === null) root = v;  // in case there are only circles
      if (v.sourceEdges.count === 0) {
        root = v;
        break;
      }
    }
    // couldn't find a root vertex
    if (root === null) {
      this.network = null;
      return;
    }

    const space = this.spacing;
    const cw = (this.clockwise ? 1 : -1);
    let rad = this.radius;
    if (rad <= 0 || isNaN(rad) || !isFinite(rad)) rad = this.diameter(root) / 4;

    // treat the root node specially: it goes in the center
    let angle = cw * Math.PI;
    root.centerX = originx;
    root.centerY = originy;

    let edge = root.destinationEdges.first();
    // if (edge === null || edge.link === null) return;
    const link = (edge !== null ? edge.link : null);
    if (link !== null) link.curviness = cw * rad;

    // now locate each of the following nodes, in order, along a spiral
    let vert = (edge !== null ? edge.toVertex : null);
    while (vert !== null) {
      // involute spiral
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      let x = rad * (cos + angle * sin);
      let y = rad * (sin - angle * cos);
      // the link might connect to a member node of a group
      if (link !== null && vert.node instanceof go.Group && link.toNode !== null && link.toNode !== vert.node) {
        const offset = link.toNode.location.copy().subtract(vert.node.location);
        x -= offset.x;
        y -= offset.y;
      }
      vert.centerX = x + originx;
      vert.centerY = y + originy;

      const nextedge = vert.destinationEdges.first();
      const nextvert = (nextedge !== null ? nextedge.toVertex : null);
      if (nextvert !== null) {
        // clockwise curves want positive Link.curviness
        if (this.isRouting && nextedge !== null && nextedge.link !== null) {
          if (!isNaN(nextedge.link.curviness)) {
            const c = nextedge.link.curviness;
            nextedge.link.curviness = cw * Math.abs(c);
          }
        }

        // determine next node's angle
        const dia = this.diameter(vert) / 2 + this.diameter(nextvert) / 2;
        angle += cw * Math.atan((dia + space) / Math.sqrt(x * x + y * y));
      }
      edge = nextedge;
      vert = nextvert;
    }

    this.updateParts();
    this.network = null;
  }

  /**
   * Compute the effective diameter of a Node.
   */
  public diameter(v: go.LayoutVertex): number {
    if (!v) return 0;
    const b = v.bounds;
    return Math.sqrt(b.width * b.width + b.height * b.height);
  }

}
